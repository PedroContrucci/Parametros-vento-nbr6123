import streamlit as st
import pandas as pd
import numpy as np
from scipy.interpolate import griddata

st.set_page_config(page_title="Parâmetros de Vento - NBR 6123", layout="wide")
st.title("🌬️ Cálculo dos Parâmetros de Vento conforme NBR 6123:1988")

# Inputs
col1, col2, col3 = st.columns(3)
with col1:
    latitude = st.number_input("Latitude", format="%.6f")
with col2:
    longitude = st.number_input("Longitude", format="%.6f")
with col3:
    altura_torre = st.number_input("Altura da torre (m)", min_value=1.0, format="%.2f")

# Grade simulada de Vo com base em pontos do mapa da norma
grade_vo = pd.DataFrame({
    "Latitude": [-33.0, -30.0, -27.0, -24.0, -21.0, -18.0, -15.0, -12.0, -9.0],
    "Longitude": [-57.0, -54.0, -51.0, -48.0, -45.0, -42.0, -39.0, -36.0, -33.0],
    "Vo": [30.0, 32.5, 35.0, 37.5, 40.0, 42.5, 45.0, 47.5, 50.0]
})

# Expand grade para interpolação
latitudes = []
longitudes = []
vo_values = []
for i in range(len(grade_vo)):
    for j in range(len(grade_vo)):
        latitudes.append(grade_vo["Latitude"][i])
        longitudes.append(grade_vo["Longitude"][j])
        vo_values.append((grade_vo["Vo"][i] + grade_vo["Vo"][j]) / 2)

# Função de interpolação refinada
def interpolar_vo(lat, lon):
    ponto = np.array([[lat, lon]])
    vo_interp = griddata((latitudes, longitudes), vo_values, ponto, method='linear')
    if np.isnan(vo_interp):
        vo_interp = griddata((latitudes, longitudes), vo_values, ponto, method='nearest')
    return round(float(vo_interp), 2)

# Simulação de inclinação e obstáculos por direção
direcoes = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
inclinacoes = [4.5 + i * 0.5 + abs(latitude % 1) for i in range(8)]
obstaculos = [3.0 + i * 0.3 + abs(longitude % 1) for i in range(8)]

# Cálculo de S1 por direção
def calcular_s1(inclinacao):
    if inclinacao < 3:
        return 0.85
    elif inclinacao < 5:
        return 0.90
    elif inclinacao < 7:
        return 1.00
    elif inclinacao < 9:
        return 1.05
    else:
        return 1.10

s1_direcoes = [calcular_s1(inc) for inc in inclinacoes]
s1 = max(s1_direcoes)

# Cálculo de S2 pela menor média de obstáculos
media_obstaculos = [round(o, 2) for o in obstaculos]
menor_media = min(media_obstaculos)
if menor_media < 5:
    categoria = "II"
    s2 = 0.95
elif menor_media < 10:
    categoria = "III"
    s2 = 1.00
else:
    categoria = "IV"
    s2 = 1.05

# Classe da edificação
if altura_torre <= 20:
    classe = "A"
elif altura_torre <= 50:
    classe = "B"
else:
    classe = "C"

# S3 fixo
s3 = 1.0

# Vo interpolado
vo = interpolar_vo(latitude, longitude)

# Vk
vk = round(vo * s1 * s2 * s3, 2)

# Resultados
st.subheader("📊 Resultados dos Parâmetros")
df_result = pd.DataFrame({
    "Parâmetro": ["Vo (m/s)", "S1", "S2", "S3", "Vk (m/s)"],
    "Valor": [vo, s1, s2, s3, vk]
})
st.table(df_result)

# Tabela por direção
st.subheader("📈 Inclinação e Obstáculos por Direção")
df_direcao = pd.DataFrame({
    "Direção": direcoes,
    "Inclinação (°)": [round(i, 2) for i in inclinacoes],
    "S1": s1_direcoes,
    "Altura média dos obstáculos (m)": media_obstaculos
})
st.dataframe(df_direcao)

# Informações adicionais
st.markdown(f"**Categoria de terreno:** {categoria}")
st.markdown(f"**Classe da edificação:** {classe}")

