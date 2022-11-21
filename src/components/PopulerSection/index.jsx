import CardItem from "../CardItem";
import "../PopulerSection/style.css";
function Index({populer}) {
    return (
        <div className="container-populer">
            <h2>Produk Populer</h2>
            <h6>Produk ini kami tawarkan kepada anda produk yang sering dibeli.</h6>
            <div className="row mt-4">
                {
                    populer.map((populer, i) => (
                        <CardItem
                            key={i}
                            populer={populer}
                            {...populer} />
                    ),)
                }
            </div>
        </div>
    );
}

export default Index;