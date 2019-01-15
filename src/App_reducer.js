
/* About function : board_reducer 
all processes in board_reducer function
depending on the type of action which is provided as a parameter,
impliments CRUD 

The types of action : 1) BOARD_LIST- provides the script lists
2) BOARD_SAVE- to store the script which is created newly or edited
3) BOARD_READ- to select the script to modify
4) BOARD_REMOVE- to remove the script
*/

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'ONE';
const BOARD_LIST = 'LIST';

// The board_reducer function is not called from outside of App_reducer.js,
// just each function - board_list, board_save, board_read, board_remove - 
// is called according to the action type
export const board_save = (data) => ({
    type: BOARD_SAVE,
    data
});

export const board_remove = (brdno) => ({
    type: BOARD_REMOVE,
    brdno
});

export const board_read = (brdno) => ({
    type: BOARD_READ,
    brdno
});

export const board_list = () => ({
    type: BOARD_LIST
});


const initialState = {
    maxNo: 3,
    boards: [
        {
            brdno: 1,
            brdwriter: 'Mark Higgins',
            brdtitle: 'Life is...',
            brddate: new Date()
        },
        {
            brdno: 2,
            brdwriter: 'Hmin Yu',
            brdtitle: 'The future with AI',
            brddate: new Date()
        },
    ],
    selectedBoard: {}
};

/* state: store data, function board_reducer: data management 
* state: do not need to declare, 
* assign initial value using initialState from board_reducer function
*
* initialState has the same structure with the state which stores data in crud-one board
* and it is made by Json
*
* maxNo: max line, boards: store data, selectedBoard: currently selected line to modify data
*/

export default function board_reducer(state = initialState, action) {
    let boards = state.boards;

    switch(action.type) {
        case BOARD_SAVE:
            let data = action.data;
            let maxNo = state.maxNo;
            if (!data.brdno) {
                return {
                    maxNo: maxNo+1, 
                    boards: boards.concat({...data, brdno:maxNo, brddate: new Date()}), 
                 selectedBoard: {}  
                };
            }
            return {...state,
                boards: boards.map(row => data.brdno === row.brdno ? 
                {...data}: row), selectedBoard: {}  
                };

        case BOARD_REMOVE:
                return {...state,
                    boards: boards.filter(row => row.brdno !== action.brdno ? 
                    {...data}: row), selectedBoard: {}  
                    };

        case BOARD_READ:
                    return {...state,
                        selectedBoard: boards.find(row => row.brdno === action.brdno)
                        };
        default: 
        return state;
    }

}