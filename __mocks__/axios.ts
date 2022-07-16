import axios from 'axios';
const mockAxios = jest.createMockFromModule<typeof axios>('axios');
mockAxios.create.mockReturnThis;

export default mockAxios;
