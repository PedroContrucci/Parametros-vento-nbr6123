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
    vo_interp = grid
