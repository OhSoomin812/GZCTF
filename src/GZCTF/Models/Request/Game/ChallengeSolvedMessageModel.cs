namespace GZCTF.Models.Request.Game;

/// <summary>
/// Story message returned after a team solves a challenge
/// </summary>
public class ChallengeSolvedMessageModel
{
    /// <summary>
    /// The solved story message (null if the admin has not set one)
    /// </summary>
    public string? Message { get; set; }
}
