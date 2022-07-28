const server = {
  address: "ec2-52-221-201-228.ap-southeast-1.compute.amazonaws.com",
  port: "8000",
};

interface Config {
  serverUrl?: string;
  paths: {
    login: string;
    howManyTriesAlready: string;
    guess: string;
  };
}

const config: Config = (() => {
  const _config: any = {};

  _config.serverUrl = `http://${server.address}:${server.port}`;
  _config.paths = {
    login: `${_config.serverUrl}/api/token/`,
    howManyTriesAlready: `${_config.serverUrl}/pokemon/how-many-tries-already`,
    guess: `${_config.serverUrl}/pokemon/guess/`,
  };

  return _config;
})();
export default config;
