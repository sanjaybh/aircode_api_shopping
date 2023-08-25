const {
  Body,
  Container,
  Column,
  Hr,
  Html,
  Img,
  Link,
  Button,
  Row,
  Section,
  Text,
} = require('@react-email/components');

const React = require('react');

const dt = new Date();
const year = dt.getFullYear();

const getEmail = (title, excerpt, coverImage, href) => {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Link href={href + "?ref=view-in-browser"} style={viewBrowserLink}>
              View in browser
            </Link>
            <Text style={splitLine}>|</Text>
            <Link href="https://docs.aircode.io/" style={viewBrowserLink}>
              About AirCode
            </Link>
          </Section>
          <Section style={logo}>
            <Img
              style={logoImage}
              src="https://s2.loli.net/2023/08/23/BKvqVWsig97DuYZ.png"
              width="35px"
              height="35px"
              alt="logo"
            />
            <h2 style={emailTitle}>{title}</h2>
          </Section>
          <Section style={paragraphContent}>
            <Hr style={hr} />
            <Text style={heading}>Hi, here are the latest updates: </Text>
          </Section>

          <Section style={paragraphContent}>
            <Column>
              <Text style={paragraph}>{excerpt}</Text>
            </Column>
          </Section>

          <Section style={paragraphContent}>
            <Column style={postImage}>
              <Img
                src={coverImage}
                style={{ borderRadius: "2px" }}
                alt="What we are building"
                width="400px"
              />
            </Column>
          </Section>

          <Section
            style={{
              ...paragraphContent,
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Button pX={12} pY={12} style={button} href={href + "?ref=read-the-post"}>
              Read the post
            </Button>
          </Section>

          <Section style={{ ...paragraphContent, textAlign: 'center' }}>
            <Text style={mediaParagraph}>Star and Follow us</Text>
          </Section>
          <Section style={containerContact}>
            <Link
              style={mediaLink}
              href="https://github.com/aircodelabs/aircode"
            >
              <Img
                width="28"
                height="28"
                src="https://s2.loli.net/2023/08/23/UOrLaKQHWNoJi3v.png"
              />
            </Link>
            <Link style={mediaLink} href="https://twitter.com/aircode_io">
              <Img
                width="28"
                height="28"
                src="https://s2.loli.net/2023/08/23/gr3n1jYGCkJ9oxT.png"
              />
            </Link>
          </Section>

          <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
            <Text
              style={{
                ...paragraph,
                fontSize: '12px',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {`©${year}  AirCode, Inc. All rights reserved.`}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

module.exports = getEmail;

const main = {
  padding: '10px 2px',
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const header = {
  color: '#666',
  padding: '20px 0',
  textAlign: 'center',
};

const logo = {
  display: 'inline-table',
  textAlign: 'center',
  margin: '0 auto',
};

const logoImage = {
  display: 'inline-block',
  marginRight: '10px',
};

const emailTitle = {
  display: 'inline-block',
  fontSize: '24px',
};

const splitLine = {
  lineHeight: '10px',
  margin: '0 4px',
  display: 'inline-block',
};

const viewBrowserLink = {
  display: 'inline-block',
  fontSize: '11px',
  lineHeight: '10px',
  textUnderlinePosition: 'from-font',
  textDecoration: 'underline',
  color: '#666',
  textDecorationColor: '#666',
};

const sectionLogo = {
  padding: '0 10px',
};

const container = {
  margin: '30px auto',
  width: '610px',
  backgroundColor: '#fff',
  borderRadius: 5,
  overflow: 'hidden',
};

const containerContact = {
  width: '100%',
  borderRadius: '5px',
  overflow: 'hidden',
  textAlign: 'center',
  marginBottom: '16px',
};

const mediaLink = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '0 5px',
};

const postTitle = {
  marginLeft: '10px',
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: '700',
  color: '#6B7AFF',
};

const postImage = {
  paddingTop: '16px',
};

const mediaParagraph = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#3c4043',
};

const heading = {
  fontSize: '14px',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#6B7AFF',
  borderRadius: '3px',
  color: '#fff',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  marginTop: '26px',
};

const paragraphContent = {
  padding: '0 40px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#3c4043',
};

const hr = {
  borderColor: '#e8eaed',
  margin: '20px 0',
};
