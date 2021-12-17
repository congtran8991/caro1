// himport HomePage from '../../page/home-page';
import CreateRoom from '../Page/createRoom';
import Room from '../Page/room';
export const routes = [
    {
        path: "/",
        exact: true,
        main: <CreateRoom />
    },
    {
        path: "/:id",
        exact: true,
        main: <Room />
    },
];