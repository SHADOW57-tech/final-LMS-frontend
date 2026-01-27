import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { FiSearch, FiX } from "react-icons/fi";

const Page = styled.section`
  border-radius: 0%;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  color: white;
  overflow: hidden;
  background-image: url(IMG_5407.PNG);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 100%) {
    padding: 16px;
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const TopBar = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 34px;
  height: 34px;

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  max-height: ${({ open }) => (open ? "60px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: white;


  @media (max-width: 600px) {
    max-height: ${({ open }) => (open ? "70px" : "0")};
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  
`;

const SearchInput = styled.input`
  color: black;
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const List = styled.div`
  padding: 10px;
`;

const Borrower = styled.div`
  background: white;
  color: black;
  padding: 50px;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  @media (max-width: 600px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Info = styled.div`
  strong {
    font-size: 15px;
  }
  small {
    display: block;
    color: gray;
    font-size: 13px;
  }

  @media (max-width: 600px) {
    strong {
      font-size: 12px;
    }
    small {
      font-size: 12px;
    }
  }
`;

const Right = styled.div`
  text-align: right;

  strong {
    display: block;
    font-size: 15px;
  }

  span {
    display: block;
    font-size: 13px;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    text-align: left;
  }
`;

const Status = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ type }) =>
    type === "returned"
      ? "green"
      : type === "overdue"
        ? "red"
        : type === "due"
          ? "orange"
          : "grey"};
`;

const MOCK_DATA = [
  {
    name: "Prosper Tanko",
    book: "Quantum Physics",
    date: "Jan. 08, 21:02:05",
    status: "Returned",
    type: "returned",
  },
  {
    name: "Prosper Tanko",
    book: "Applied Geophysics",
    date: "Jan. 04, 21:02:05",
    status: "Overdue by 3 days",
    type: "overdue",
  },
  {
    name: "Barbecue Seint",
    book: "Biography",
    date: "Jan. 01, 21:02:05",
    status: "Due tomorrow",
    type: "due",
  },
  {
    name: "Barbecue Seint",
    book: "Geography",
    date: "Jan. 01, 21:02:05",
    status: "Due tomorrow",
    type: "due",
  },
  {
    name: "Neymar Jnr",
    book: "Accounting 101",
    date: "Jan. 01, 22:08:08",
    status: "Due in 5 days",
  },
];

function BorrowersPage() {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [borrowers] = useState(MOCK_DATA);

  const filtered = borrowers.filter((b) =>
    `${b.name} ${b.book}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Page>
        <Header />
        <TopBar>
          <Left>
            <Logo src="/logo.png" alt="Logo" />
            <Title>
              <strong>Borrowers</strong>
            </Title>
          </Left>

          <IconBtn onClick={() => setOpenSearch(!openSearch)}>
            <FiSearch />
          </IconBtn>
        </TopBar>

        <SearchWrapper open={openSearch}>
          <SearchBox>
            <SearchInput
              placeholder="Search name or book..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <ClearBtn onClick={() => setQuery("")}>
                <FiX />
              </ClearBtn>
            )}
          </SearchBox>
        </SearchWrapper>

        <List>
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "gray" }}>
              No results found
            </p>
          )}

          {filtered.map((b, i) => (
            <Borrower key={i}>
              <Info>
                {b.name}
                <small>{b.date}</small>
              </Info>

              <Right>
                <strong>{b.book}</strong>
                <Status type={b.type}>{b.status}</Status>
              </Right>
            </Borrower>
          ))}
        </List>
      </Page>
    </>
  );
}

export default BorrowersPage;
