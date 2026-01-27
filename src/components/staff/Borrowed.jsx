import styled from "styled-components";

const Page = styled.section`
  border-radius: 0%;
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  color: white;
  overflow: hidden;
  background: linear-gradient(to bottom, #e6f7f6, #00e5ee);

  @media (max-width: 100%) {
    padding: 16px;
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: black;
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

const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (min-width: 768px) {
    max-width: 900px;
    margin: 0 auto;
  }
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BookMain = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BookImage = styled.img`
  width: 90px;
  height: auto;
  border-radius: 4px;
`;

const BookDetails = styled.div`
  flex: 1;
`;

const BookTitle = styled.p`
  font-size: 14px;
  color: #b00000;
  text-decoration: underline;
  margin-bottom: 10px;
`;

const DueWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const DueText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;

  span {
    background: #e0e0e0;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 5px;
  }
`;

const BorrowedPage = () => {
  return (
    <Page>
      <TopBar>
        <Left>
          <Logo src="/logo.png" alt="Logo" />
        </Left>
      </TopBar>
      <Header>
        <strong>Borrowed Books</strong>
      </Header>

      <BooksContainer>
        {/* Book 1 */}
        <BookCard>
          <BookMain>
            <BookImage src="/Rectangle 37.png" alt="Book" />

            <BookDetails>
              <BookTitle>
                <strong>A lorem ipsum dolor sit amet.</strong>
              </BookTitle>
            </BookDetails>
          </BookMain>
          <DueWrapper>
            <DueText>
              Due <span>3</span>
            </DueText>
          </DueWrapper>
        </BookCard>
        {/* Book 2 */}
        <BookCard>
          <BookMain>
            <BookImage src="/Rectangle 37.png" alt="Book" />

            <BookDetails>
              <BookTitle>
                <strong>A lorem ipsum dolor sit amet.</strong>
              </BookTitle>
            </BookDetails>
          </BookMain>
          <DueWrapper>
            <DueText>
              Due <span>4</span>
            </DueText>
          </DueWrapper>
        </BookCard>
        {/* Book 3 */}
        <BookCard>
          <BookMain>
            <BookImage src="/Rectangle 37.png" alt="Book" />

            <BookDetails>
              <BookTitle>
                <strong>A lorem ipsum dolor sit amet.</strong>
              </BookTitle>
            </BookDetails>
          </BookMain>
          <DueWrapper>
            <DueText>
              Due <span>5</span>
            </DueText>
          </DueWrapper>
        </BookCard>
        {/* Book 4 */}
        <BookCard>
          <BookMain>
            <BookImage src="/Rectangle 37.png" alt="Book" />

            <BookDetails>
              <BookTitle>
                <strong>A lorem ipsum dolor sit amet.</strong>
              </BookTitle>
            </BookDetails>
          </BookMain>
          <DueWrapper>
            <DueText>
              Due <span>2</span>
            </DueText>
          </DueWrapper>
        </BookCard>
      </BooksContainer>
    </Page>
  );
};

export default BorrowedPage;
