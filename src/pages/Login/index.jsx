import CartIcon from '../../assets/login_page.svg'
import TextField from '../../components/TextField'

function Index () {
  return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col">
                        <img width={'450px'} src={CartIcon} alt="" className="img-fluid"/>
                    </div>
                    <div className="col">
                        <TextField id={'email'} placeholder={'Enter email...'}/>
                        <TextField id={'password'} placeholder={'Enter password...'}/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Index
