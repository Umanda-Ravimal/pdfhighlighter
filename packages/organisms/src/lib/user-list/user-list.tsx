import { UserCard } from '@my-workspace/packages-molecules';
import { UserCardProps } from '@my-workspace/packages-interfaces';
import { Grid } from '@my-workspace/packages-atoms';
import { generateRandomProfilePic } from '@my-workspace/packages-common';
// import { useCardStore } from './store';
import { useEffect } from 'react';

export interface UserListProps {
  users?: Array<UserCardProps>;
}

const UserList = (props: UserListProps) => {
  // const { fetchData, loading, error, data } = useCardStore();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (loading) return 'Loading';
  // if (error) return 'Something went wrong';

  return (
    <>
      <Grid container gap={4} justifyContent="center" py={4}>
        {/* {data.map((singleUser: any, index: number) => {
          const { name, username, email, phone, id } = singleUser;
          const profileUrl = generateRandomProfilePic(index + 200) ?? '';
          return (
            <Grid item xs={12} md={2} key={index}>
              <UserCard
                key={id}
                name={name}
                userName={username}
                email={email}
                phoneNumber={phone}
                profileUrl={profileUrl}
              />
            </Grid>
          );
        })} */}
      </Grid>
    </>
  );
};

export { UserList };
