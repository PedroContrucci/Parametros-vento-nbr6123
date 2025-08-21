def interpolar_vo(lat, lon):
    ponto = np.array([[lat, lon]])
    vo_interpolado = griddata((latitudes, longitudes), vo_values, ponto, method='linear')
    if np.isnan(vo_interpolado):
        vo_interpolado = griddata((latitudes, longitudes), vo_values, ponto, method='nearest')
    return round(float(vo_interpolado), 2)
