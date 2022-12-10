import React, { useEffect, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getAllPemesanan } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import EmptyList from '../../assets/emptyList.png'

function LihatPesananPage ({ titlePage, subtitlePage }) {
  const [pesanan, setPesanan] = useState([])
  const [loading, setLoading] = useState(false)
  const [produkState, setProduk] = useState([])

  async function getPesanan () {
    setLoading(true)
    const { dataPemesanan } = await getAllPemesanan()
    setPesanan(dataPemesanan)
    setLoading(false)
  }

  function ItemPesanan ({ pesanan }) {
    return (
      <div className="card mb-3">
        <div className="card-header">
          Tanggal Pemesanan : {pesanan.checkout.tanggalPemesanan}
        </div>
        <div className="card-body">
          {pesanan.checkout?.barang?.map((brg, i) => (
            <div className="row d-flex align-items-center card-product-keranjang mb-3 m-0">
              <div className="col-3">
                <img
                  src={brg.gambarBrg}
                  alt={brg.nama}
                  className="image-product-keranjang"
                />
              </div>
              <div className="col">
                <h5>
                  <b>{brg.nama}</b>
                </h5>
                <h6>Jumlah : {brg.jumlah}</h6>
                <h6>Total Harga : Rp.{brg.totalHarga}</h6>
              </div>
              <button
                type="button"
                class="btn btn-text"
                data-toggle="modal"
                data-target={`#detailpesanan${brg.idBarang}`}
              >
                Lihat Detail Pesanan
              </button>
              <div
                class="modal fade"
                id={`detailpesanan${brg.idBarang}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-lg modal-dialog-centered"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Detail {brg.nama}
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="row m-0">
                        <div className="col">
                          <img
                            src={brg.gambarBrg}
                            alt={brg.nama}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col">
                          <section>
                            <span>Detail Barang</span>
                            <h5>
                              <b>{brg.nama}</b>
                            </h5>
                            <h6>Jumlah : {brg.jumlah}</h6>
                            <h6>Total Harga : Rp.{brg.totalHarga}</h6>
                          </section>
                          <section className='mt-4'>
                            <span>Alamat Pengiriman</span><br />
                            <span>
                              <b>Nama Penerima : {pesanan.alamatPengiriman.namaPenerima}</b>
                            </span><br />
                            <span>{pesanan.alamatPengiriman.notelp}</span><br />
                            <span>{pesanan.alamatPengiriman.tujuan}</span>
                          </section>
                          <section className='mt-4'>
                            <span>Jasa Pengiriman</span><br />
                            <span>
                              <b>Nama Jasa : {pesanan.jasaPengiriman.namaJasa}</b>
                            </span><br />
                            <span>Tipe Pengiriman : {pesanan.jasaPengiriman.tipePengiriman}</span><br />
                          </section>
                        </div>
                      </div>
                      <table class="table table-sm mt-4 m-0">
                        <tbody>
                          <tr>
                            <th scope="row">Subtotal Produk</th>
                            <td>
                              Rp.{parseInt(pesanan.checkout.totalHargaAll)}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Subtotal Pengiriman</th>
                            <td>Rp.{pesanan.jasaPengiriman.harga}</td>
                          </tr>
                          <tr>
                            <th scope="row">Biaya Layanan</th>
                            <td>Rp.{pesanan.biayaLayanan}</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <h4 className="text-danger">
                                <b>Total Pembayaran</b>
                              </h4>
                            </th>
                            <td>
                              <h4 className="text-danger">
                                <b>Rp.{pesanan.totalPembayaran}</b>
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function NotFound () {
    return (
      <center>
        <img src={EmptyList} width={250} height={250} className='img-fluid mx-auto d-block' alt='' />
        <h6><b>Kamu belum membuat pesanan apapun. Ayo belanja sekarang!</b></h6>
      </center>
    )
  }

  useEffect(() => {
    getPesanan()
  }, [])

  return (
    <div className="card shadow border-0">
      <Loading visible={loading} />
      <div className="card-body">
        <div className="mb-4">
          <h2 className="font-weight-bold">{titlePage}</h2>
          <h6>{subtitlePage}</h6>
        </div>
        <div className="col m-0">
          {pesanan !== null
            ? (
                pesanan.map((data, i) => data.iduser === localStorage.getItem(CONFIQ.authUser) ? <ItemPesanan pesanan={data}/> : setPesanan(null))
              )
            : (
              <NotFound/>
              )}
        </div>
      </div>
    </div>
  )
}

export default LihatPesananPage
