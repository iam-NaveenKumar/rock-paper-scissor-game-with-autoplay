# to deploy
import streamlit as st
import streamlit.components.v1 as components

# Embed the HTML content
with open("index.html", "r") as f:
    html_code = f.read()

# Embed the CSS content (for inline CSS)
with open("index.css", "r") as f:
    css_code = f.read()

# Embed the JS content (for inline JavaScript)
with open("main.js", "r") as f:
    js_code = f.read()

# Adding CSS styling
st.markdown(f'<style>{css_code}</style>', unsafe_allow_html=True)

# Embed HTML
components.html(html_code, height=600)

# You can add custom JS to handle interactions, or use Streamlit features if required
st.markdown(f'<script>{js_code}</script>', unsafe_allow_html=True)

st.title("Rock Paper Scissors Game with Autoplay")
