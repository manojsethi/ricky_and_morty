import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "urql";
import { useStore } from "./store/index";
const CharachterQuery = `
  query ($page: Int!) {
    characters(page: $page){
      info{
        count,
        pages,
        next,
        prev
      },
      results{
        id,
        name,
        gender,
        image,
      }
    }
  }
`;
function App() {
  const page = useStore<any>((state: any) => state.page);
  const setPage = useStore((state: any) => state.setPage);

  const darkMode = useStore<any>((state: any) => state.darkMode);
  const setDarkMode = useStore((state: any) => state.setDarkMode);

  const [result, reExecuteQuery] = useQuery({
    query: CharachterQuery,
    variables: { page },
  });
  const { data, fetching, error } = result;
  if (fetching)
    return (
      <Typography variant="h5" textAlign={"center"}>
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h5" textAlign={"center"}>
        Oh no... {error.message}
      </Typography>
    );
  return (
    <div style={{ backgroundColor: darkMode ? "black" : "white" }}>
      <Typography variant="h2" textAlign={"center"}>
        Ricky And Morty
      </Typography>
      <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} p={2}>
        {data.characters.results.map((c: any, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="300"
                  image={c.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.name}
                  </Typography>
                  <Typography variant="h6" color="black">
                    {c.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        mb={2}
      >
        {data.characters.info.prev && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setPage(data.characters.info.prev);
              reExecuteQuery({ requestPolicy: "network-only" });
            }}
          >
            Back
          </Button>
        )}
        &nbsp;
        {data.characters.info.next && (
          <Button
            variant="contained"
            onClick={() => {
              setPage(data.characters.info.next);
              reExecuteQuery({ requestPolicy: "network-only" });
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </div>
  );
}

export default App;
