import KategoriItem from "./kategori-item";
import "../KategoriSection/style.css";

function Index({categories}) {
    return (
        <div>
            <h2>Kategori</h2>
            <h6>Pilih kategori yang kamu inginkan disini</h6>
            <div className="row justify-content-center container-kategori mt-4">
                {
                    categories.map((kategori, i) => (
                        <KategoriItem
                            key={i}
                            kategori={kategori}
                            {...kategori} />
                    ),)
                }
            </div>
        </div>
    );
}

export default Index;