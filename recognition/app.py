from flask import Flask, render_template, request, jsonify
from qreader import QReader
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime, time
from dotenv import load_dotenv
import numpy as np
import cv2
import base64
import os

load_dotenv()

app = Flask(__name__)
qreader = QReader()

Base = declarative_base()

class Visitor(Base):
    __tablename__ = 'visitors'

    id = Column(Integer, primary_key=True)
    fullName = Column(String, nullable=False)

    visits = relationship("Visit", back_populates="visitor")

class Company(Base):
    __tablename__ = 'companys'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    visits = relationship("Visit", back_populates="company")

class Visit(Base):
    __tablename__ = 'visits'

    id = Column(Integer, primary_key=True)
    startDate = Column(DateTime, nullable=False)
    endDate = Column(DateTime, nullable=True)

    visitorId = Column(Integer, ForeignKey('visitors.id'))
    companyId = Column(Integer, ForeignKey('companys.id'))

    visitor = relationship("Visitor", back_populates="visits")
    company = relationship("Company", back_populates="visits")

    def to_dict(self):
        return {
            "id": self.id,
            "startDate": self.startDate.isoformat() if self.startDate else None,
            "endDate": self.endDate.isoformat() if self.endDate else None,
            "visitor": {
                "id": self.visitor.id,
                "fullName": self.visitor.fullName
            } if self.visitor else None,
            "company": {
                "id": self.company.id,
                "name": self.company.name
            } if self.company else None
        }
    
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(os.getenv("DATABASE_URL"))

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scan', methods=['POST'])
def scan():
    try:
        data = request.json
        image_data = data['image'].split(',')[1]  # remove o cabeçalho base64
        img_bytes = base64.b64decode(image_data)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.COLOR_BGR2GRAY)        
        
        decoded = qreader.detect_and_decode(image=img)
        print('decoded: ', decoded)

        if decoded and len(decoded) > 0:
            uuid = decoded[0]
            print(f"uuid: {uuid}")
        else:
            return jsonify({"success": False, "error": "QR code não detectado"}), 400

        visita_response = {}
        success = False

        visita = session.get(Visit, uuid)

        if not visita or visita is None:
            return jsonify({"success": success, "data": {}}), 404

        visita_dict = visita.to_dict()

        print(f"visita_dict: {visita_dict}")

        startDate = visita_dict["startDate"]
        startDateIso = datetime.fromisoformat(startDate)
        startDateFormat = startDateIso.strftime('%d/%m/%Y %H:%M:%S')

        endDate = visita_dict["endDate"]
        endDateIso = datetime.fromisoformat(endDate)
        endDateFormat = endDateIso.strftime('%d/%m/%Y %H:%M:%S')

        now = datetime.now()

        success = True
        
        visita_response = {
            "startDate": startDateFormat,
            "endDate": endDateFormat,
            "name": visita_dict["visitor"]["fullName"],
            "company": visita_dict["company"]["name"],
            "valid": now >= startDateIso and now <= endDateIso
        }

        print(f'visita_response: {visita_response}')

        return jsonify({'success': success, 'data': visita_response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)