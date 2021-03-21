import Cell from "../Cell";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import DataTest from "./dataTest";

configure({ adapter: new Adapter() });
describe("Test open zero", () => {
    const {tests, results} = DataTest;
    const wrapper = shallow(<Cell />);
    tests.forEach((test, idx) => {
        console.log(idx)
        let {i, j, board} = test;
        let height = board.length, width = board[0].length;
        let res = Array(height).fill().map(() => Array(width).fill(0));
        it('Test matrix '+idx, () => {
            expect(wrapper.instance().openZero(i, j, board, res)).toEqual(results[idx]);
        });
    })
})