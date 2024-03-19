import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

interface BookMarkCardProp {
    banner: string;
    description: string;
}

export const BookMarkCard: React.FC<BookMarkCardProp> = ({banner, description}) => {

  return (
    <Card sx={{ maxWidth: 345, display: 'inline-flex', marginRight: '10px' }}>
      <CardMedia
        component="img"
        height="194"
        image={banner}
        alt="Banner Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}