let isAdmin = true

function admin(req, res, next) {
	if (isAdmin) {
	  next();
	} else {
		let response = {error : -1, description : `Ruta:  ${req.path}  Metodo: ${req.method}  No implementada`};
		res.send(response)
	}
}

module.exports = {admin}