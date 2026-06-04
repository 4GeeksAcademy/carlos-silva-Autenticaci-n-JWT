


"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity 

from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)


CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200




@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()


    if body is None:
        return jsonify({"msg": "El cuerpo de la solicitud no puede estar vacío"}), 400

    email = body.get("email", None)
    password = body.get("password", None)


    if not email or not password:
        return jsonify({"msg": "El correo electrónico y la contraseña son obligatorios"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "Este correo electrónico ya está registrado"}), 400

  
    hashed_password = generate_password_hash(password)

   
    new_user = User(email=email, password=hashed_password, is_active=True)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario registrado exitosamente con contraseña segura"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error interno del servidor al crear el usuario"}), 500




@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "El cuerpo de la solicitud no puede estar vacío"}), 400

    email = body.get("email", None)
    password = body.get("password", None)

    if not email or not password:
        return jsonify({"msg": "El correo electrónico y la contraseña son obligatorios"}), 400

    
    user = User.query.filter_by(email=email).first()
    
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401

   
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "msg": "Inicio de sesión exitoso"
    }), 200





@api.route('/private', methods=['GET'])
@jwt_required()  
def handle_private():
   
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado o no autorizado"}), 404

    return jsonify({
        "msg": f"Bienvenido a tu panel privado, usuario {user.email}!",
        "user": user.serialize()
    }), 200
