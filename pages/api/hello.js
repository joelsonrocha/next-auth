// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../../middleware/utils";

export default (req, res) => {
  const { origin } = absoluteUrl(req);

  //res.status(200).json({ name: 'John Doe', profile: req.headers.authorization })

  //trecho de código feio, precisa pensar numa forma mais 
  //elegante para pegar o usuário do header ou cookies, 
  //dependendo de onde venha a requisição, local ou remoto, api
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else {
    token = getAppCookies(req).token;
  }

  //res.status(200).json({ name: 'John Doe', token: token })

  const profile = token ? verifyToken(token.split(" ")[1]) : "";

  if (profile) {
    let person = getPerson(req.body.name, req.body.idade);
    res.status(200).json({ person: person, profile: profile, origin: origin });
  } else {
    res.status(403).json({ message: "not authorized" });
  }
};

function getPerson(name, idade) {
  return `Meu nome é ${name} e tenho ${idade} anos`;
}
