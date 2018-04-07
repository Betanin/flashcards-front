import { locationChange, push } from './actions';

export function startListener(history, store) {

    store.dispatch(locationChange({
        pathname: history.location.pathname,
        search: history.location.search,
        hash: history.location.hash,
    }));

    history.listen((location) => {
        store.dispatch(locationChange({
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
        }));
    });

    store.subscribe(() => {

        const isSignedin = store.getState().login.email;
        const isNotAtSigninPage = store.getState().router.pathname !== '/login';
        if (!isSignedin && isNotAtSigninPage) {
            store.dispatch(push('/login'));
            return;
        }

        const gameStatus = store.getState().board.game.status;
        const isPlaiyng = gameStatus === 'PLAYING';
        const isNotAtBoardPage = store.getState().router.pathname !== '/board';
        if (isPlaiyng && isNotAtBoardPage) {
            store.dispatch(push('/board'));
            return;
        }

        const gameIsFinished = gameStatus === 'FINISHED';
        const isNotAtResultPage = store.getState().router.pathname !== '/result';
        if (gameIsFinished && isNotAtResultPage) {
            store.dispatch(push('/result'));
            return;
        }
        
    });

}