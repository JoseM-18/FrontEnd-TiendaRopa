import React  from 'react'
import {AppBar, Toolbar, Typography, Button, Link, Container, IconButton} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import "./css/Navbar.css"
import { useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import {TextField,FormControl, InputLabel, Select, MenuItem, InputBase, styled, alpha} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';



function Navbar() {
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = React.useState(false)
  
  // define el estado de isLogged si hay un token en el localstorage
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true)
    }else {
      setIsLogged(false)
    }
  }, [])

  const handleLogout = () => {
    setIsLogged(false)
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }
 

  return (
    <AppBar position="fixed">
      <Toolbar className='toolbar' >
        <Typography className='nombreTool' variant="h6"  >
          <Link href="/" className='title' style={{textDecoration:"none",color:"white"} }> 
          AgroMerque
          </Link>
        </Typography>

        <Search />

        { isLogged ? (
          <> 
            <IconButton color = "inherit" onClick={() => navigate('/cart')}>
              <ShoppingCartIcon  />
              <Typography variant='body-1' fontSize="14px">
                Carrito
              </Typography>
              </IconButton>
              <IconButton color = "inherit" onClick={handleLogout}>
              <LogoutIcon  />
              <Typography variant='body-1' fontSize="14px">
                Cerrar Sesión
              </Typography>
              </IconButton>
              </>
        ) : ( 
          <>
        <dev className='botones'>
            <Button variant="contained" color="success" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
            <Button variant="contained" color="success" onClick={() => navigate('/register')}
            >Registrarse</Button>
            </dev>
            </>
        )}
      </Toolbar>
    </AppBar>

    
  )
}

function Search() {
  
  
  const [name, setName] = React.useState(
    {name: ''}
  );

  const handleSubmit = async (event) => {
    //event.preventDefault();

    const url = `http://localhost:4000/product/name/${encodeURIComponent(name.name)}`;

    const res = await fetch( url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if(res.status === 400) {
      const data = await res.json()
      console.log("error")
  
  }

    const data = await res.json()
    console.log(data)


}

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(name.name === '') {
        return alert('Ingrese un producto')
      }
      handleSubmit();
    }
  };

  const handleChange = (event) => {
    setName({
      ...name,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <TextField
        sx={{ flex: 1 }}
        placeholder="Busca nuestros productos"
        inputProps={{ 'aria-label': 'Busca nuestros productos' }}
        name="name"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );

}



function FilterBy () {
  
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <dev className='filtro'>
    <FormControl label="Outlined secondary" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>
      Filtrar Por
      </InputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={selectedOption}
        onChange={handleChange}
      >
        <MenuItem value="">Categoria</MenuItem>
        <MenuItem value="option1">Nombre</MenuItem>
        <MenuItem value="option2">id</MenuItem>
      </Select>
    </FormControl>
    </dev>
  );
}



export default Navbar