import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as React from 'react'
import Layout from "../components/Layout";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getBook, bookSelector, addCart } from '../store/Slices/bookSlice'


const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const dispatch = useAppDispatch()
  const getBooks = useSelector(bookSelector)
  React.useEffect(() => {
    dispatch(getBook())
  }, [])

  return (
    <Layout>
      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liff && (
          <Container>
            <Grid container spacing={2}>
              {getBooks.dataBooks.map((data, index) => {
                return (
                  <>
                    <Grid item xs={6} md={4} key={index}>
                      <Item>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component="img"
                            alt={data.bookName}
                            height="100"
                            image={data.bookImg}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {data.bookName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {data.bookPrice}฿
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button variant="contained" onClick={() => {
                              dispatch(addCart({
                                name: data.bookName,
                                price: data.bookPrice,
                                image: data.bookImg,
                                card: 1
                              }))
                            }}><AddIcon />Add</Button>
                          </CardActions>
                        </Card>
                      </Item>
                    </Grid>
                  </>
                )
              })}
            </Grid>
          </Container>
        )
        }
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
            <a
              href="https://developers.line.biz/ja/docs/liff/"
              target="_blank"
              rel="noreferrer"
            >
              LIFF Documentation
            </a>
          </>
        )}

      </main>
    </Layout>
  );
};

export default Home;
