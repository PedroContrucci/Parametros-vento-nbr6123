
import streamlit as st

# Funções auxiliares
def calcular_vo(lat):
    # Simulação simplificada com base na latitude
    if lat >= -5:
        return 30.0
    elif lat >= -15:
        return 35.0
    elif lat >= -25:
        return 40.0
    else:
        return 45.0

def calcular_s1(inclinacoes):
    s1 = 1.0
    for inc in inclinacoes:
        if inc < 3:
            fator = 0.85
        elif inc < 5:
            fator = 0.90
        elif inc < 7:
            fator = 1.00
        elif inc < 9:
            fator = 1.05
        else:
            fator = 1.10
        s1 = max(s1, fator)
    return s1

def calcular_s2(obstaculos):
    media = sum(obstaculos) / len(obstaculos)
    if media < 5:
        return 0.95
    elif media < 10:
        return 1.00
    else:
        return 1.05

def obter_s3(grupo):
    tabela = {
        "1": 1.10,
        "2": 1.00,
        "3": 0.95,
        "4": 0.88,
        "5": 0.83
    }
    return tabela.get(grupo, 1.00)

# Interface Streamlit
st.set_page_config(page_title="Parâmetros de Vento - NBR 6123", layout="centered")
st.title("🌬️ Cálculo dos Parâmetros de Vento - NBR 6123:1988")

st.markdown("Preencha os dados abaixo para calcular automaticamente os parâmetros de vento:")

# Inputs
col1, col2 = st.columns(2)
with col1:
    lat = st.number_input("Latitude (decimal)", value=-20.0)
    altura = st.number_input("Altura da torre (m)", value=40.0)
with col2:
    lon = st.number_input("Longitude (decimal)", value=-45.0)
    grupo = st.selectbox("Grupo estrutural", ["1", "2", "3", "4", "5"])

categoria = st.selectbox("Categoria de terreno", ["I", "II", "III", "IV", "V"])
classe = st.selectbox("Classe da edificação", ["A", "B", "C"])

# Simulação de dados por direção
direcoes = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
inclinacoes = [4.5 + i * 0.5 + abs(lat % 1) for i in range(8)]
obstaculos = [3.5 + i * 0.3 + abs(lon % 1) for i in range(8)]

# Cálculos
vo = calcular_vo(lat)
s1 = calcular_s1(inclinacoes)
s2 = calcular_s2(obstaculos)
s3 = obter_s3(grupo)
vk = round(vo * s1 * s2 * s3, 2)

# Resultados
st.subheader("📊 Resultados")
st.write(f"**Vo (m/s):** {vo}")
st.write(f"**S1:** {s1}")
st.write(f"**S2:** {s2}")
st.write(f"**S3:** {s3}")
st.write(f"**Vk (m/s):** {vk}")

# Tabela por direção
st.subheader("📈 Dados por direção")
import pandas as pd
df = pd.DataFrame({
    "Direção": direcoes,
    "Inclinação (°)": [round(i, 2) for i in inclinacoes],
    "Altura média dos obstáculos (m)": [round(o, 2) for o in obstaculos]
})
st.dataframe(df)
