package monday;

public class Player {
	private String playerCountry;
	private String playerName;
	public Player() {
		playerCountry = "India";
		
	}
	public Player(String playerName){
		this(); // constructor chaining
		this.playerName = playerName;
	}
	
	public String toString() {
		return "Player [playerName = " + playerName + ", playerCountry = " + playerCountry+" ]";
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Player p = new Player("Virat");
		System.out.println(p);

	}

}
