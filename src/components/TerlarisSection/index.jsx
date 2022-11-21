import TerlarisItem from "./terlaris-item";
import "../TerlarisSection/style.css"
function Index({terlaris}) {
    return (
        <div className="container-terlaris">
            <h2>Terlaris</h2>
            <h6>Lihat yang banyak orang beli selama ini.</h6>
            <div className="row mt-4">
                {
                    terlaris.map((terlaris, i) => (
                        <TerlarisItem
                            key={i}
                            terlaris={terlaris}
                            {...terlaris} />
                    ),)
                }
            </div>
        </div>
    );
}

export default Index;