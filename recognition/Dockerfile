# Usa imagem oficial do Python 3.11.11
FROM python:3.11.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências do sistema e libzbar
RUN apt-get update && apt-get install -y \
    libzbar0 \
    gcc \
    libgl1 \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia as dependências e instala com pip
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia o restante do projeto
COPY . .

# Expõe a porta 5000
EXPOSE 5000

# Comando para rodar o Flask com Gunicorn na porta 5000
# CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
