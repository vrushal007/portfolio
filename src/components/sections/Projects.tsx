import {
  Container,
  Box,
  Typography,
  Chip,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const projects = [
  {
    title: "Unified Pay",
    description: "A Unified Payment Gateway Integration Library",
    technologies: ["TypeScript", "Node.JS", "OOPs"],
    points: [
      "Unified Payment Integration: Built UnifyPay, a TypeScript library merging Stripe and Razorpay for managing orders, subscriptions, and plans through a single interface.",
      "Scalable & Extensible Design: Implemented type-safe configurations and modular abstractions, ensuring maintainability and support for future providers.",
      "Developer-Centric Optimization: Streamlined workflows with provider-specific logic and authored detailed documentation for easy adoption.",
    ],
    githubLink: "https://github.com/DarshilChauhan1/unified-pay",
    liveLink: "https://npmjs.com/package/unified-pay-node",
    image: "/assets/images/npm.png",
  },
  
];

const Projects = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          background: "linear-gradient(45deg, #00f5d4, #7209b7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Featured Projects
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <Card
              sx={{
                height: "100%",
                maxWidth: 600,
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                sx={{ objectFit: "contain",pt: 2 }}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {project.description}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: "secondary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    />
                  ))}
                </Box>
                {project.points.map((point, idx) => (
                  <Box key={idx} sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ p: 2, justifyContent: "flex-end" }}>
                <IconButton
                  href={project.githubLink}
                  target="_blank"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href={project.liveLink}
                  target="_blank"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <LaunchIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
