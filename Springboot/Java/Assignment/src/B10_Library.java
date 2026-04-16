
public class B10_Library {
	private int bookId;
	private String title;
	private String author;
	
	public B10_Library(int bookId, String title, String author) {
		this.bookId = bookId;
		this.title = title;
		this.author = author;
	}
	
    public String getTitle() { 
    	return title;
    	}
    public int getBookId() { 
    	return bookId;
    	}
	
	public String toString() {
		return "Id: " +bookId+ ", Title: "+title+", Author: "+author;
	}
	
}
