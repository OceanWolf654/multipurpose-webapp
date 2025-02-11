from flask import Flask, request, jsonify
import yt_dlp
import requests

app = Flask(__name__)

# === YouTube MP3 Downloader ===
@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"error": "Missing URL"}), 400

    try:
        ydl_opts = {'format': 'bestaudio/best', 'outtmpl': 'downloads/%(title)s.%(ext)s'}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return jsonify({"message": "Download started!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Weather Checker ===
@app.route('/weather', methods=['POST'])
def check_weather():
    data = request.json
    city = data.get("city")
    if not city:
        return jsonify({"error": "Missing city"}), 400

    try:
        geo_url = f"https://nominatim.openstreetmap.org/search?q={city}&format=json"
        geo_response = requests.get(geo_url)
        geo_data = geo_response.json()
        if not geo_data:
            return jsonify({"error": "City not found"}), 404

        lat, lon = geo_data[0]["lat"], geo_data[0]["lon"]
        weather_url = f"https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"
        headers = {"User-Agent": "MyWeatherApp/1.0"}
        weather_response = requests.get(weather_url, headers=headers)
        weather_data = weather_response.json()

        temp = weather_data["properties"]["timeseries"][0]["data"]["instant"]["details"]["air_temperature"]
        condition = weather_data["properties"]["timeseries"][0]["data"].get("next_1_hours", {}).get("summary", {}).get("symbol_code", "unknown")

        return jsonify({"city": city, "temp": temp, "condition": condition.replace("_", " ").title()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
