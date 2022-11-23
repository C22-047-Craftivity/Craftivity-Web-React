import "../Button/style.css";

function ButtonBeli() {
    return (
        <button className="button-beli">Beli Sekarang</button>
    );
}

function ButtonKeranjang() {
    return (
        <button className="button-keranjang">Tambah Keranjang</button>
    );
}

function ButtonCari(){
    return (
        <button className="button-cari">Cari</button>
    );
}

function ButtonCheckout(){
    return (
        <button className="button-checkout">Checkout Sekarang</button>
    )
}

function ButtonHapus(){
    return (
        <button className="button-hapus">Hapus</button>
    )
}

export { ButtonBeli, ButtonKeranjang, ButtonCari, ButtonCheckout, ButtonHapus}; 