import { useState } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 16px;
`;

const Burger = styled.div`
  font-size: 30px;
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 34px;

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 99;
`;

const SideNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 20px;
  z-index: 999;
  background-color: rgba(255, 255, 225, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
`;

const NavItem = styled.a`
  display: block;
  color: #120202;
  margin-bottom: 15px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #6f6ad9;
  }
`;

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <Burger onClick={() => setOpen(true)}>☰</Burger>
      </HeaderWrapper>

      <Overlay open={open} onClick={() => setOpen(false)} />

      <SideNav open={open}>
        <NavItem href="#">
          <strong>Dashboard</strong>
        </NavItem>
        <NavItem href="#">
          <strong>Borrowed</strong>
        </NavItem>
        <NavItem href="#">
          <strong>Settings</strong>
        </NavItem>
        <NavItem href="#" onClick={() => setOpen(false)}>
          <strong>Close</strong>
        </NavItem>
      </SideNav>
    </>
  );
}

export default Header;
