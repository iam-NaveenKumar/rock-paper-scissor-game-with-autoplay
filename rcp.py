import streamlit as st
import random
import json

# Function to load the score from local storage or set it to default
def load_score():
    if "score" not in st.session_state:
        st.session_state.score = {"win": 0, "lose": 0, "tie": 0}

# Function to save the score into session state
def save_score():
    st.session_state.score = {"win": st.session_state.win, "lose": st.session_state.lose, "tie": st.session_state.tie}

# Function to update the score displayed
def update_score():
    st.write(f"wins : {st.session_state.score['win']} | lose : {st.session_state.score['lose']} | tie : {st.session_state.score['tie']}")

# Function to simulate computer's move
def computermove():
    moves = ["rock", "paper", "scissors"]
    return random.choice(moves)

# Function to handle the game logic
def play_game(player_move):
    computer = computermove()
    result = ""

    if player_move == "rock":
        if computer == "rock":
            result = "tie"
        elif computer == "paper":
            result = "lose"
        else:
            result = "win"
    elif player_move == "scissors":
        if computer == "rock":
            result = "lose"
        elif computer == "paper":
            result = "win"
        else:
            result = "tie"
    elif player_move == "paper":
        if computer == "rock":
            result = "win"
        elif computer == "paper":
            result = "tie"
        else:
            result = "lose"

    if result == "win":
        st.session_state.score['win'] += 1
    elif result == "lose":
        st.session_state.score['lose'] += 1
    else:
        st.session_state.score['tie'] += 1

    # Save updated score in session state
    save_score()

    st.write(f"Result: {result.capitalize()}")
    st.write(f"Your move: {player_move.capitalize()} | Computer's move: {computer.capitalize()}")
    update_score()

# Streamlit UI for displaying the game
def main():
    st.title("Rock Paper Scissors")

    # Initialize score
    load_score()

    # Buttons for rock, paper, scissors
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("Rock"):
            play_game("rock")
    
    with col2:
        if st.button("Paper"):
            play_game("paper")
    
    with col3:
        if st.button("Scissors"):
            play_game("scissors")

    # Reset button to reset the score
    if st.button("Reset Score"):
        st.session_state.score = {"win": 0, "lose": 0, "tie": 0}
        save_score()
        update_score()

    # Autoplay toggle
    if 'autoplay' not in st.session_state:
        st.session_state.autoplay = False

    if st.button("Toggle Autoplay"):
        st.session_state.autoplay = not st.session_state.autoplay
        if st.session_state.autoplay:
            st.write("Autoplay is now ON.")
        else:
            st.write("Autoplay is now OFF.")

if __name__ == "__main__":
    main()

