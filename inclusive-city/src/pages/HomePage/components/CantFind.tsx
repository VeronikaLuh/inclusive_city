import { Button } from "@mui/joy";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";

export const CantFind = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const userData = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    
    return(
      <>
      {isMobile ? (
        <Box display="flex"
        justifyContent="center"
        margin={'auto'}
        flexDirection="column"
        sx={{boxShadow: 15, 
        height: 350, width: '95%',
        marginBottom: 5,
        }}>
              <Box sx={{textAlign: 'start', height: 'fit-content', marginLeft: 3, marginRight: 2}}>
            <Box > 
            <h1 aria-label = "Не можеш знайти, те що шукав?" style={{fontWeight: 'bold', fontSize: 30}}>Не можеш знайти, те що шукав?</h1> 
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis aliquam mollitia asperiores. Velit nisi excepturi ex provident, culpa labore quaerat illo numquam itaque aspernatur reprehenderit, voluptatum et ab. Dolor. </span>   
            </Box>  
            {!userData.isAuthenticated ? (
                    <Button size="lg" onClick={() => navigate("/login")} color="success" sx={{marginTop: 2}}>Увійти</Button> 
                   ) : (
                    <Button size="lg" onClick={() => navigate("/message")} color="success" sx={{marginTop: 2}}>Надіслати питання</Button> 
                   )} 
</Box> 
</Box>  
        ) : (
          <Box display="flex"
        justifyContent="center"
        margin={'auto'}
        flexDirection="column"
        sx={{boxShadow: 15, 
        height: 500, width: '95%',
        marginBottom: 5,
        }}>
                <Grid container spacing={1} gap={10} justifyContent={"center"} columns={2}>
                   <Grid item xs={1} direction={'column'}>
                   <Box sx={{display: "flex", flexDirection: 'column', gap: '0', textAlign: 'start', height: 'fit-content'}}> 
                   <h1 aria-label = "Не можеш знайти, те що шукав?" style={{fontWeight: 'bold', fontSize: 50}}>Не можеш знайти, те що шукав?</h1>    
                   <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis aliquam mollitia asperiores. Velit nisi excepturi ex provident, culpa labore quaerat illo numquam itaque aspernatur reprehenderit, voluptatum et ab. Dolor. </span>
                   </Box> 
                   {!userData.isAuthenticated ? (
                    <Button size="lg" onClick={() => navigate("/login")} color="success" sx={{marginTop: 5}}>Увійти</Button> 
                   ) : (
                    <Button size="lg" onClick={() => navigate("/message")} color="success" sx={{marginTop: 5}}>Надіслати питання</Button> 
                   )} 
                   </Grid>
                   <Grid item>
                   <Box display={'flex'}
                       justifyContent={'center'}
                       alignItems={'center'}>
                   <Box
                   
         component="img"
         sx={{
           height: 400,
           width: 350,
         }}
         alt="Instruction"
         src={'/src/Images/PublicImages/qa.jpg'}
       />
       </Box>   
                   </Grid>
                   </Grid>
                   </Box>
            )}
</>
    );
}