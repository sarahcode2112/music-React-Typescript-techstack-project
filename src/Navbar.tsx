import { useState } from 'react'
import {CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CPopover} from '@coreui/react'

export const Navbar = () => {
  
  // is there any point to specifying the type as boolean? (given that typescript already infers it)
  const [visible, setVisible] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#">Harsh Noise Editor</CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                {/* TODO replace this with a Modal, opening an 'about' popup */}
                <CButton onClick={() => setModalVisible(!modalVisible)}>About (as a modal)</CButton>
                <CModal alignment="center" visible={modalVisible} onClose={() => setModalVisible(false)}>
                  <CModalHeader>
                    <CModalTitle>About this Webapp</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <p>
                      I built this webapp to practice the tech stack we use at Ledgy.
                      This app allows a user to edit harsh noise art with a simple UI (which is suspiciously similar to Ledgy's UI).
                      <br /> <br />
                      Thank you to the <CPopover title="Traineeship:" content="A program at Ledgy which prepares 5 trainees to become Junior developers in 6 months.">
                          <CButton color="warning">Traineeship</CButton>
                      </CPopover> program for teaching me the skills relevant to this project.
                    </p>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                      Close
                    </CButton>
                    <CButton color="primary">
                      Press this to do nothing
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" disabled>
                  Example of disabled button
                </CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Dropdown list</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Instructions</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Other item</CDropdownItem>
                  <CDropdownItem href="#">Another item</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}