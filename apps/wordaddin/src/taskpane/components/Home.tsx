// import * as React from "react";
// import { HeroList, HeroListItem } from "./hero-list";
// import { makeStyles } from "@fluentui/react-components";
// import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
// import { insertText } from "../../utils";
// import { TextInsertion } from "./text-insertion";
// import { Header } from "./Header";

// interface HomeProps {
//   title: string;
// }

// const useStyles = makeStyles({
//   root: {
//     minHeight: "100vh",
//   },
// });

// const Home: React.FC<HomeProps> = (props: HomeProps) => {
//   const styles = useStyles();
//   // The list items are static and won't change at runtime,
//   // so this should be an ordinary const, not a part of state.
//   const listItems: HeroListItem[] = [
//     {
//       icon: <Ribbon24Regular />,
//       primaryText: "Achieve more with Office integration",
//     },
//     {
//       icon: <LockOpen24Regular />,
//       primaryText: "Unlock features and functionality",
//     },
//     {
//       icon: <DesignIdeas24Regular />,
//       primaryText: "Create and visualize like a pro",
//     },
//   ];

//   return (
//     <div className={styles.root}>
//       <Header logo="assets/logo.png" title={props.title} message="Welcome" />
//       <HeroList message="Discover what this add-in can do for you today!" items={listItems} />
//       <TextInsertion insertText={insertText} />
//     </div>
//   );
// };

// export { Home };
