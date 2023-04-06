import axios from 'axios';

// import { fetchData } from './';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };
    const mockAxiosGet = jest.fn(() => Promise.resolve(data));
    mockedAxios.get.mockImplementationOnce(mockAxiosGet);
    
    // expect that data is rendered correctly
    // render(<App />)
    expect(mockAxiosGet).toHaveBeenCalledTimes(1);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    // expect that error messages are rendered
  });
});