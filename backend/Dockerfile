FROM python:3.11

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -q && \
    apt-get install -y -qq --no-install-recommends \
        xvfb \
        libxcomposite1 \
        libxdamage1 \
        libatk1.0-0 \
        libasound2 \
        libdbus-1-3 \
        libnspr4 \
        libgbm1 \
        libatk-bridge2.0-0 \
        libcups2 \
        libxkbcommon0 \
        libatspi2.0-0 \
        libnss3

COPY requirements.txt .

RUN pip install -r requirements.txt && \
    pip install --upgrade openai && \
    playwright install chromium 

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]