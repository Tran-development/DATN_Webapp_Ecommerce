import axios from "axios";
import Web3 from 'web3';

export const calculateTotalPrice = (productPayment) => {
    return productPayment?.reduce((acc, item) => {
        return acc + item?.product?.attributes?.productPrice * item?.quantity;
    }, 0);
};

export const getSelectedProducts = (productCart) => {
    // Chỉ lấy các sản phẩm có isSelected là true
    const selectedProducts = productCart?.filter((product) => product.isSelected);
    return selectedProducts
};

export const areAllSelected = (productCart) => {
    return productCart?.every((item) => item.isSelected);
};

export const converEth = (ethPrice, shipping) => {
    // const usdPrice = ethPrice?.ethereum.usd
    const results = shipping / ethPrice
    if (results) {
        return results
    }
}

export const initWeb3 = async () => {
    try {
        if (!window.ethereum)
            await window.ethereum.send("eth_requestAccounts");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            // Nếu đã có tài khoản, sử dụng đối tượng Web3 đã khởi tạo
            return new Web3(window.ethereum);
        } else {
            // Nếu chưa có tài khoản, thực hiện kết nối
            await window.ethereum.enable();
            return new Web3(window.ethereum);
        }
    } catch (error) {

    }
};

// Trong hàm sendTransaction
export const sendTransaction = async (total, successCallback, errorCallback) => {
    console.log(total);
    const paymentAddress = '0x4607d9A7F1cD9CAdA9b22823cc7b6c5d7078B7D5';
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const senderAddress = accounts[0];
    const Wei = 1e18;

    const params = [
        {
            from: senderAddress,
            to: paymentAddress,
            value: Number(total * Wei).toString(16),
            gasPrice: Number(10000000000).toString(16),
        }
    ];

    try {
        const result = await window.ethereum.request({ method: 'eth_sendTransaction', params });
        console.log('Transaction Successful:', result);
        // Gọi hàm callback khi giao dịch thành công
        if (successCallback) {
            successCallback(result);
        }
        return result;
    } catch (error) {
        console.error('Transaction Error:', error);
        // Gọi hàm callback khi giao dịch thất bại
        if (errorCallback) {
            errorCallback(error);
        }
    }
};


export const handleConnectWallet = async () => {
    try {
        let web3;

        // Kiểm tra xem đã kết nối với MetaMask chưa
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
        } else {
            // Nếu chưa kết nối, thực hiện kết nối bằng hàm initWeb3
            web3 = await initWeb3();
        }

        const accounts = await web3.eth.requestAccounts();
        const walletAddress = accounts[0];

        // Gọi phương thức eth_getBalance
        const weibalance = await web3.eth.getBalance(walletAddress);
        const balance = web3.utils.fromWei(weibalance, 'ether');

        // Trả về đối tượng chứa địa chỉ ví và số dư tiền
        return { walletAddress, balance };
    } catch (error) {
        console.error(error);
        // Xử lý lỗi kết nối
    }
};

export const updateCart = (arr) => {
    return arr.filter(item => !item.isSelected);
}
