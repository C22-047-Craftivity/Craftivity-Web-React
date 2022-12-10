import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

function ImageDetail ({ data, hiddenLike = true, hiddenUnLike = true, btnLike, btnUnLike }) {
  return (
    <div style={{ position: 'relative' }} className="col image-detail">
      <img src={data.gambarBrg} alt={data.nama}/>
      <div style={{ position: 'absolute', top: '10px', right: '30px' }}>
        <button id='btnLike' hidden={hiddenLike} onClick={btnLike} style={{ color: 'red', border: 'none', backgroundColor: '#FBDBCB', borderRadius: '50%', padding: '10px', fontSize: '30px' }}><MdFavoriteBorder /></button>
        <button id='btnUnlike' hidden={hiddenUnLike} onClick={btnUnLike} style={{ color: 'red', border: 'none', backgroundColor: '#FBDBCB', borderRadius: '50%', padding: '10px', fontSize: '30px' }}><MdFavorite /></button>
      </div>
    </div>
  )
}

export default ImageDetail
