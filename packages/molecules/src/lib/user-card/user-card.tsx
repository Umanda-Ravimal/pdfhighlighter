import { Avatar, Box, Typography, Card, CardContent } from '@my-workspace/packages-atoms';
import styles from './user-card.module.css';
import { UserCardProps } from '@my-workspace/packages-interfaces';

const UserCard = (props: UserCardProps) => {
  const { name, userName, email, phoneNumber, profileUrl } = props;
  return (
    <Card>
      <CardContent>
        <Box className={styles['user-card']}>
          <Typography>{name}</Typography>
          <Avatar src={profileUrl}>SK</Avatar>
          <Typography>{userName}</Typography>
          <Typography>{email}</Typography>
          <Typography>{phoneNumber}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export { UserCard };
