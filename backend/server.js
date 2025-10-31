const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const porta = 3001;
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
 
const connection = require('./sql');
 
app.post('/usuario/cadastrar', (request,response) => {
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
    );

    let query = "INSERT INTO users(name,email,password) VALUES(?,?,?);";

    connection.query(query,params, (err,results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})
 
app.get('/usuario/listar', (request,response) => {
    const query = "SELECT * FROM users";
 
    connection.query(query,params, (err,results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
 
   
})
 
app.put('/usuario/editar/:id', (request,response) => {
    const { name, email, password } = request.body;
    const id = request.params.id;
    let params = [name, email, password, id];
    let query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
   
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})
 
app.delete('/usuario/deletar/:id', (request,response) => {
    let params = Array(
        request.params.id
    );
 
    let query = "DELETE FROM users WHERE id = ?;"
 
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})
 
app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )
 
    let query = "SELECT * FROM users WHERE email = ?";
 
    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigitada = request.body.password
            let senhaBanco = results[0].password
 
            if (senhaBanco == senhaDigitada) {
            response
              .status(200)
              .json({
                success: true,
                message: "Sucesso",
                data: results[0]
              })
          } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Verifique sua senha!"
            })
          }
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Email não cadastrado!"
            })
        }
    })
})

app.post('/contato/enviar', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      success: false,
      message: 'Por favor, preencha todos os campos.'
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manumjramos@gmail.com',
      pass: 'wpjm olez ftit yxzh'
    }
  });

  const mailOptions = {
    from: email,
    to: 'manumjramos@gmail.com',
    subject: `Nova mensagem de contato de ${nome}`,
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log('E-mail enviado com sucesso!');
    res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar a mensagem.',
      error: error.toString()
    });
  }
});
