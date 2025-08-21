
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Parâmetros de Vento - NBR 6123", layout="wide")

st.title("🌬️ Cálculo dos Parâmetros de Vento - NBR 6123:1988")

st.markdown("Preencha os campos abaixo para calcular automaticamente os parâmetros de vento conforme a norma.")

# Inputs
col1, col2, col3 = st.columns(3)
with col1:
    latitude = st.number_input("Latitude", format="%.6f")
with col2:
    longitude = st.number_input("Longitude", format="%.6f")
with col3:
    altura_torre = st.number_input("Altura da torre (m)", min_value=0.0, format="%.2f")

col4, col5 = st.columns(2)
with col4:
    modo_s1 = st.selectbox("Modo S1", ["Automático", "Manual"])
with col5:
    modo_s2 = st.selectbox("Modo S2", ["Automático", "Manual"])

# Simulação de dados com base nas coordenadas
def gerar_dados_direcionais(lat, lon):
    direcoes = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    inclinacoes = [round(4.5 + i * 0.5 + abs(lat - int(lat)), 2) for i in range(8)]
    obstaculos = [round(3.5 + i * 0.3 + abs(lon - int(lon)), 2) for i in range(8)]
    return pd.DataFrame({
        "Direção": direcoes,
        "Inclinação (°)": inclinacoes,
        "Altura média dos obstáculos (m)": obstaculos
    })

# Cálculo de S1
def calcular_s1(df):
    s1_valores = []
    for inc in df["Inclinação (°)"]:
        if inc < 3:
            s1_valores.append(0.85)
        elif inc < 5:
            s1_valores.append(0.90)
        elif inc < 7:
            s1_valores.append(1.00)
        elif inc < 9:
            s1_valores.append(1.05)
        else:
            s1_valores.append(1.10)
    return max(s1_valores)

# Cálculo de S2
def calcular_s2(df):
    media_obs = df["Altura média dos obstáculos (m)"].mean()
    if media_obs < 5:
        return 0.95
    elif media_obs < 10:
        return 1.00
    else:
        return 1.05

# Cálculo final
if latitude and longitude and altura_torre:
    df_graphs = gerar_dados_direcionais(latitude, longitude)
    st.subheader("📈 Dados por direção")
    st.dataframe(df_graphs)

    vo = 42.5
    s1 = calcular_s1(df_graphs) if modo_s1 == "Automático" else 1.0
    s2 = calcular_s2(df_graphs) if modo_s2 == "Automático" else 0.95
    s3 = 1.0
    vk = round(vo * s1 * s2 * s3, 2)

    st.subheader("📊 Parâmetros calculados")
    df_calc = pd.DataFrame({
        "Parâmetro": ["Vo (m/s)", "S1", "S2", "S3", "Vk (m/s)"],
        "Valor": [vo, s1, s2, s3, vk]
    })
    st.dataframe(df_calc)

else:
    st.info("Preencha latitude, longitude e altura da torre para iniciar os cálculos.")
