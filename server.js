import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const JWT_SECRET = "teste124693736289n9v3ytb39yth3qp9y"

const app = express();
app.use(cookieParser());
app.use(express.json());
app.cors({
    //origin: "http://localhost3000",
    Credential: true
});

function autentificarusuario(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" })
    }

    try {
        const usuario = jwt.verify(token, JWT_SECRET);
        req.usuario = usuario
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado" })
    }
}

app.post("/register", async (req, res) => {
    const { email, senha, cpf } = req.body;

})

app.post("/login", async (req, res) => {
    //login 

    const token = jwt.sign(
        { id: cliente.id },
        JWT_SECRET,
        { expireIn: "10" },
    );

    res.cookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        masAge: 3600000
    })

    res.json({message: "Login realizado com sucesso!"})
});

app.get("/faturamento", autentificarusuario, async (req, res) => {
    res.json({message: "meu faturamento"})
})

app.listen(PORT, () => {
    console.log("API rodando")
});