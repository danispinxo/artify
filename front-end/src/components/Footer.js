import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "../styles/footer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <MDBFooter className='footer'>
      <section className='d-flex justify-content-center p-4'>

        <div>
          <a href='#!' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='#!' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='#!' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='#!' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='#!' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 id="nav-logo" className='fw-bold mb-4'>
              <FontAwesomeIcon icon={faPaintBrush} />
               Artify
              </h6>
              <p>
                Dani.S
              </p>
              <p>
                Mohammed.A
              </p>
              <p>
                Jeffrey.H
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Categories</h6>
              <p>
                <a href='/category/1' className='text-reset'>
                  Children's Art
                </a>
              </p>
              <p>
                <a href='/category/2' className='text-reset'>
                 Photography
                </a>
              </p>
              <p>
                <a href='/category/3' className='text-reset'>
                 Painting
                </a>
              </p>
              <p>
                <a href='/category/4' className='text-reset'>
                 Drawing
                </a>
              </p>
              <p>
                <a href='/category/5' className='text-reset'>
                 Portrait
                </a>
              </p>
              <p>
                <a href='/category/6' className='text-reset'>
                 Landscape
                </a>
              </p>
              <p>
                <a href='/category/7' className='text-reset'>
                Digital Art
                </a>
              </p>
              <p>
              <a href='/category/8' className='text-reset'>
                Computer Art
              </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/artists' className='text-reset'>
                  Artists
                </a>
              </p>
              <p>
                <a href='/categories' className='text-reset'>
                  Categories
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Toronto, ON, CAN
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                noreplyArtify@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright: 
         <a className='text-reset fw-bold' href='#!'>
          Artify.com
        </a>
      </div>
    </MDBFooter>

  )
}
