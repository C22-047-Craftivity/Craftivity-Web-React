function TerlarisItem({terlaris}) {
    return (  
        <div className="col">
            <div style={{backgroundImage: `url(${terlaris.src})`}} className="card card-terlaris shadow-lg border-0 ">
                <div className="card-body-terlaris">
                    <p className="font-weight-bold">{terlaris.name}</p>
                </div>
            </div>
        </div>
    );
}

export default TerlarisItem;