import requests
import gzip
from lxml import etree

# Download URL for the epg.xml.gz file
url = "https://raw.githubusercontent.com/tobalan/tobalan.github.io/main/epg.xml.gz"

# Download the file
response = requests.get(url)

# Check for successful download
if response.status_code == 200:
  # Download data
  data = response.content

  # Decompress the data (assuming in gzip format)
  with gzip.open(dataobj=data, mode='rb') as decompressed_file:
    decompressed_data = decompressed_file.read()

  # Parse the XML data
  root = etree.fromstring(decompressed_data)

  # Extract data (replace with your logic)
  for program in root.findall("programme"):
    title = program.find("title").text
    start_time = program.find("start").text
    print(f"Title: {title}, Start Time: {start_time}")

else:
  print(f"Error downloading file: {response.status_code}")
