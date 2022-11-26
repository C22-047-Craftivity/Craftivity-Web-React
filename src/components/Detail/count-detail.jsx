function CountDetail({ harga, setJumlah, setTotal, jumlah, totalHarga }) {
  const adding = () => {
    setJumlah((jumlah += 1));
    const sum = jumlah * harga;
    setTotal(sum);
  };

  const substracting = () => {
    if (jumlah > 1) {
      setJumlah((jumlah -= 1));
    }
    const sum = jumlah * harga;
    setTotal(sum);
  };
  return (
    <div className="col-3">
      <div className="row m-0 d-flex align-items-center justify-content-between">
        <button id="substracting" onClick={substracting} className="btn-count">
          -
        </button>
        <span>{jumlah}</span>
        <button onClick={adding} className="btn-count">
          +
        </button>
      </div>
    </div>
  );
}

export default CountDetail;
