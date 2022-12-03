import React from 'react'
import NavbarLogin from '../../components/NavBarLogin'
import { NavLink } from 'react-router-dom'
import UserMenu from '../../components/UserMenu'

function AlamatPage ({ onLogout }) {
  return (
        <div>
            <NavbarLogin logoutHandler={onLogout}/>
            <div className="container mt-4 mb-5">
                <h2>Atur Alamat</h2>
                <h6>Tambah alamat anda disini sebelum mulai belanja!</h6>
                <div className="row mt-4">
                    <div className="col-lg-3">
                        <UserMenu logoutHandler={onLogout}/>
                    </div>
                    <div className="col">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AlamatPage
